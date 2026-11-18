import type { Metadata } from 'next';
import { Suspense } from 'react';

import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { isAdminConfigured } from '@/lib/academy/admin-auth';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Admin',
  description: 'Totally Ink Academy application dashboard.',
  path: '/admin',
});

// Force dynamic — admin must never be statically prerendered.
export const dynamic = 'force-dynamic';

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const configured = isAdminConfigured();
  const initialToken = token?.trim() ?? '';

  return (
    <>
      <PageHeader
        label="Admin"
        title="Academy applications"
        lead={
          <p>
            Review applications, update status, download documents, retry notifications and manage
            the TVET competency catalogue.
          </p>
        }
        meta={[
          { label: 'Access', value: configured ? 'ADMIN_TOKEN' : 'Not configured' },
          { label: 'Storage', value: 'Local JSON + files' },
        ]}
      />
      <Container className="pb-24">
        {!configured ? (
          <div className="border-accent/50 bg-accent-wash text-meta text-ink rounded-sm border px-4 py-4">
            Set <code className="font-mono">ADMIN_TOKEN</code> in the environment to enable the
            dashboard. Until then this page stays locked.
          </div>
        ) : (
          <Suspense fallback={<p className="text-meta text-faint font-mono">Loading…</p>}>
            <AdminDashboard initialToken={initialToken} />
          </Suspense>
        )}
      </Container>
    </>
  );
}
