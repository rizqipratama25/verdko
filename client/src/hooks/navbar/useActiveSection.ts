import { useEffect, useRef, useState } from "react";

export const useActiveSection = (sectionIds: string[], options?: IntersectionObserverInit) => {
    const [activeSection, setActiveSection] = useState<string>(sectionIds[0]);
    const intersectingMap = useRef<Map<string, IntersectionObserverEntry>>(new Map());

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    intersectingMap.current.set(entry.target.id, entry);
                } else {
                    intersectingMap.current.delete(entry.target.id);
                }
            });

            const visible = Array.from(intersectingMap.current.values());

            if (visible.length > 0) {
                const topMost = visible.reduce((prev, curr) => curr.boundingClientRect.top < prev.boundingClientRect.top ? curr : prev);
                setActiveSection(topMost.target.id);
            }
        },
            {
                rootMargin: "-20% 0px -35% 0px",
                threshold: 0,
                ...options
            }
        );

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => {
            observer.disconnect();
            intersectingMap.current.clear();
        };
    }, [sectionIds]);

    return activeSection;
}