
import Gutters from '../Gutters';
import { FontSizes, MetricsSizes } from '../variables';
import Layout from '../Layout';
import FontSize from '../Fonts'
import { Colors } from '../colors';

const useTheme = () => {
    const baseTheme = {
        Fonts:FontSize(Colors),
        // Gutters: Gutters(MetricsSizes),
        Layout: Layout()
    }

    return baseTheme
}

export default useTheme