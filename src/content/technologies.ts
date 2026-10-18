/**
 * Technologies, grouped. Rendered as mono text lists — never a logo wall.
 *
 * Only list something the team has actually used in delivered work. An
 * aspirational stack is a lie with extra steps.
 */

export interface TechGroup {
  label: string;
  items: string[];
}

export const technologies: TechGroup[] = [
  {
    label: 'Frontend',
    items: ['React.js', 'JavaScript', 'TypeScript', 'Tailwind CSS'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Python', 'FastAPI', 'Spring Boot', 'Laravel'],
  },
  {
    label: 'Data',
    items: ['MySQL', 'MongoDB'],
  },
  {
    label: 'Mobile',
    items: ['Flutter'],
  },
  {
    label: 'Embedded & IoT',
    // Worth expanding with the specific sensor families and boards used most
    // often, once that is settled. Kept as a note here rather than rendered.
    items: ['C/C++', 'Arduino', 'ESP32', 'Raspberry Pi', 'MicroPython', 'Sensors', 'MQTT'],
  },
  {
    label: 'DevOps',
    items: ['Docker', 'Linux', 'Nginx'],
  },
  {
    label: 'AI/ML',
    items: ['Computer vision', 'Face recognition', 'Machine learning'],
  },
];
