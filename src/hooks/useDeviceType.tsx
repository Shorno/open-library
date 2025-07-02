import {Grid} from "antd";

const {useBreakpoint} = Grid;

export function useDeviceType() {
    const screens = useBreakpoint()

    return {
        isMobile: screens.xs && !screens.sm,
        isTablet: screens.sm && !screens.md,
        isDesktop: screens.md || screens.lg || screens.xl || screens.xxl,
    }
}