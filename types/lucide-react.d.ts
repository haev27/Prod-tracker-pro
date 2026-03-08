declare module 'lucide-react' {
    import { FC, SVGProps } from 'react';

    interface IconProps extends SVGProps<SVGSVGElement> {
        size?: number | string;
        color?: string;
        strokeWidth?: number | string;
        absoluteStrokeWidth?: boolean;
        className?: string;
    }

    type Icon = FC<IconProps>;

    export const ClipboardList: Icon;
    export const Plus: Icon;
    export const History: Icon;
    export const CloudCheck: Icon;
    export const CloudOff: Icon;
    export const ScanLine: Icon;
    export const Camera: Icon;
    export const X: Icon;
    export const LayoutDashboard: Icon;
    export const TrendingUp: Icon;
    export const AlertTriangle: Icon;
    export const CheckCircle: Icon;
    export const ArrowRight: Icon;
    export const Download: Icon;
    export const LayoutGrid: Icon;
    export const Factory: Icon;
    export const Settings: Icon;
}
