import { APIEndpointCard } from '@/components/ui/custom/APIEndpointCard';

interface Endpoint {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
  path: string;
  description: string;
  parameters?: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
  }>;
  requestExample?: string;
  responseExample?: string;
}

interface EndpointListProps {
  title: string;
  endpoints: Endpoint[];
}

export function EndpointList({ title, endpoints }: EndpointListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <div className="space-y-3">
        {endpoints.map((endpoint, i) => (
          <APIEndpointCard key={i} {...endpoint} />
        ))}
      </div>
    </div>
  );
}
