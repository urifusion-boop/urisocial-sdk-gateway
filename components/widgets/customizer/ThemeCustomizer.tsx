'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Palette, Settings } from 'lucide-react';

interface ThemeCustomizerProps {
  primaryColor: string;
  borderRadius: string;
  onPrimaryColorChange: (color: string) => void;
  onBorderRadiusChange: (radius: string) => void;
}

export function ThemeCustomizer({
  primaryColor,
  borderRadius,
  onPrimaryColorChange,
  onBorderRadiusChange,
}: ThemeCustomizerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Customize Theme
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Primary Color */}
        <div className="space-y-2">
          <Label htmlFor="primary-color" className="text-sm font-semibold text-gray-700">
            Primary Color
          </Label>
          <div className="flex gap-2">
            <Input
              id="primary-color-picker"
              type="color"
              value={primaryColor}
              onChange={(e) => onPrimaryColorChange(e.target.value)}
              className="w-16 h-10 p-1 cursor-pointer"
            />
            <Input
              id="primary-color"
              type="text"
              value={primaryColor}
              onChange={(e) => onPrimaryColorChange(e.target.value)}
              className="flex-1 font-mono"
              placeholder="#CD1B78"
            />
          </div>
        </div>

        {/* Border Radius */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="border-radius" className="text-sm font-semibold text-gray-700">
              Border Radius
            </Label>
            <span className="text-sm text-gray-600 font-mono">{borderRadius}px</span>
          </div>
          <Input
            id="border-radius"
            type="range"
            min="0"
            max="24"
            value={borderRadius}
            onChange={(e) => onBorderRadiusChange(e.target.value)}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0px (Square)</span>
            <span>24px (Rounded)</span>
          </div>
        </div>

        {/* Presets */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700">Color Presets</Label>
          <div className="grid grid-cols-6 gap-2">
            {['#CD1B78', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'].map((color) => (
              <button
                key={color}
                onClick={() => onPrimaryColorChange(color)}
                className="w-full aspect-square rounded-lg border-2 hover:scale-110 transition-transform"
                style={{
                  backgroundColor: color,
                  borderColor: primaryColor === color ? '#000' : 'transparent',
                }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Advanced Options */}
        <Button variant="outline" className="w-full">
          <Settings className="w-4 h-4 mr-2" />
          Advanced Options
        </Button>
      </CardContent>
    </Card>
  );
}
