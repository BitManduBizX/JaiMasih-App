import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in JaiMasih platform:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6 text-[#2C3539]">
          <div className="max-w-md w-full bg-white border border-[#F5F0EB] shadow-xl rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-[#9B1B30]/10 text-[#9B1B30] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#9B1B30] mb-2">
              केही प्राविधिक समस्या आयो
            </h2>
            <p className="text-sm text-[#2C3539]/70 mb-6">
              जयमसीह! एप्लिकेसन लोड गर्दा सानो त्रुटि देखियो। कृपया पेज रिफ्रेस गरेर पुन: प्रयास गर्नुहोस्।
            </p>
            <button
              onClick={this.handleReset}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#9B1B30] hover:bg-[#811a2c] text-white font-medium rounded-xl transition-all shadow-md active:scale-95"
            >
              <RefreshCw className="w-4 h-4" />
              पुनः लोड गर्नुहोस् (Reload)
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
