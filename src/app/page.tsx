import { AboutSplit } from '@/components/home/AboutSplit';
import { AcademyCards } from '@/components/home/AcademyCards';
import { CtaBand } from '@/components/home/CtaBand';
import { Hero } from '@/components/home/Hero';
import { ServiceCards } from '@/components/home/ServiceCards';
import { SectorsGrid } from '@/components/home/SectorsGrid';
import { StackMarquee } from '@/components/home/StackMarquee';
import { StatsRow } from '@/components/home/StatsRow';
import { WorkCards } from '@/components/home/WorkCards';

export default function HomePage() {
  return (
    <>
      <Hero />

      <StackMarquee />

      <StatsRow />

      <ServiceCards />

      <AcademyCards />

      <WorkCards />

      <SectorsGrid />

      <AboutSplit />

      <CtaBand />
    </>
  );
}
