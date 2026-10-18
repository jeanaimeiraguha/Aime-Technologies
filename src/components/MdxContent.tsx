import { MDXRemote } from 'next-mdx-remote/rsc';

import { PlaceholderFrame } from '@/components/ui/ImageFrame';
import { TodoBlock } from '@/components/ui/Todo';
import { cn } from '@/lib/cn';

/**
 * Renders an MDX body from src/content/. Element styling comes from the
 * `.prose` rules in globals.css rather than from a component map, so the MDX
 * stays plain Markdown and only genuine components are injected.
 *
 * Available inside MDX:
 *   <TodoBlock title="…">…</TodoBlock>   an unanswered section, marked in place
 *   <ArchitectureSlot label="…" />        where a diagram will go
 */
const components = {
  TodoBlock,
  ArchitectureSlot: ({ label }: { label: string }) => (
    <PlaceholderFrame label={label} ratio="16 / 9" className="my-8" />
  ),
};

export function MdxContent({ source, className }: { source: string; className?: string }) {
  return (
    <div className={cn('prose', className)}>
      <MDXRemote source={source} components={components} />
    </div>
  );
}
