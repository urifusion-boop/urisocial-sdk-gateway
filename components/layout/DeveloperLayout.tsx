import { DeveloperNavbar } from './DeveloperNavbar';
import { AppSidebar } from './AppSidebar';

export function DeveloperLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DeveloperNavbar />
      <div className="pt-16 flex">
        <AppSidebar />
        <main className="flex-1 p-8 max-w-[1400px]">{children}</main>
      </div>
    </div>
  );
}
