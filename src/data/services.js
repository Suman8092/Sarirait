import { serviceCategories, allServices } from './servicesData';

// Generate a flat service list from the canonical service catalogue
export const servicesData = allServices.map((srv, index) => {
  const num = String(index + 1).padStart(2, '0');
  return {
    id: srv.slug,
    number: num,
    title: srv.title,
    shortDesc: srv.shortDesc,
    fullDesc: `${srv.shortDesc} Engineered with modern technology, strategic precision, and relentless focus on commercial performance.`,
    icon: srv.icon,
    tags: srv.features.slice(0, 4),
    visualType: srv.categoryData.id,
    stats: {
      speed: srv.benefits[0]?.value || "< 1s",
      uptime: srv.benefits[1]?.value || "99.9%",
      conversion: srv.benefits[2]?.value || "+100%"
    },
    category: srv.categoryData.title
  };
});

export { serviceCategories, allServices };
