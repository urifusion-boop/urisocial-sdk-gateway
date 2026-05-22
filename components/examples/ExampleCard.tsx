import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, FolderGit2 } from 'lucide-react';

interface ExampleCardProps {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
}

export function ExampleCard({ title, description, tags, githubUrl, demoUrl }: ExampleCardProps) {
  return (
    <Card className="border-2 hover:border-pink-300 transition-colors h-full">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <FolderGit2 className="w-4 h-4 mr-2" />
              View Code
            </a>
          </Button>
          {demoUrl && (
            <Button size="sm" className="flex-1" style={{ backgroundColor: '#CD1B78' }} asChild>
              <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
