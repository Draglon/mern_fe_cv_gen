import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import localizedFormat from "dayjs/plugin/localizedFormat";

import "dayjs/locale/ru";
import "dayjs/locale/uk";
import "dayjs/locale/en";

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(localizedFormat);

export default dayjs;