import { redirect } from 'next/navigation';

export default function DeprecatedDynamicProjectRoute() {
  // Standardize on specific project pages; redirect to archive for now
  redirect('/archive');
} 