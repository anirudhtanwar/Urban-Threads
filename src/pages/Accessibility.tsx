import { useState } from 'react';
import { AccessibilitySettings } from '../components/settings/accessibility-settings';

const Accessibility = () => {
  const [accessibilityDialogOpen, setAccessibilityDialogOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Accessibility Settings</h1>
      <AccessibilitySettings open={accessibilityDialogOpen} onOpenChange={setAccessibilityDialogOpen} />
    </div>
  );
};

export default Accessibility;
