import {
  getMonth,
  getYear,
  getISODay,
  format,
  setDate,
  lastDayOfMonth,
  eachDayOfInterval,
  subDays,
  addDays,
  isSameMonth,
} from "date-fns";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const useCalendar = (date: Date = new Date()) => {
  const CURRENT_YEAR = new Date().getFullYear();

  const years = Array.from({ length: 130 }, (_, i) => CURRENT_YEAR - i);

  const startOfWeek = ref(0);
  const dayFormat = ref<"dd" | "d">("dd");

  const currentDate = ref(date);
  const currentMonth = ref(getMonth(date));
  const currentYear = ref(getYear(date));

  const currentDateString = computed(() => {
    currentDate.value.setFullYear(currentYear.value, currentMonth.value);
    return currentDate.value.toDateString();
  });

  const currentDay = computed(() => {
    currentDate.value.setFullYear(currentYear.value, currentMonth.value);
    return currentDate.value.getDate();
  });

  const dateForCurrentMonth = computed(() => {
    currentDate.value.setMonth(currentMonth.value);
    currentDate.value.setFullYear(currentYear.value);
    return currentDate.value;
  });

  const currentFormattedDate = computed(() => {
    currentDate.value.setFullYear(currentYear.value, currentMonth.value);
    return format(currentDate.value, "MM-dd-yyyy");
  });

  const currentMonthFormatted = computed(() => {
    return format(dateForCurrentMonth.value, "MMMM");
  });

  const currentYearFormatted = computed(() => {
    return format(dateForCurrentMonth.value, "yyyy");
  });

  const dates = computed(() => {
    const firstOfMonth = setDate(dateForCurrentMonth.value, 1);

    const firstDayInCalendar = subDays(
      firstOfMonth,
      getISODay(firstOfMonth) - startOfWeek.value
    );

    const lastOfMonth = lastDayOfMonth(dateForCurrentMonth.value);

    const lastDayInCalendar = addDays(lastOfMonth, 6 - lastOfMonth.getDay());

    return eachDayOfInterval({
      start: firstDayInCalendar,
      end: lastDayInCalendar,
    });
  });

  const setCurrentDate = (date: Date = new Date()) => {
    currentDate.value = date;
    currentMonth.value = getMonth(date);
    currentYear.value = getYear(date);
  };

  const isInSameMonth = (date: Date, dateToCompare?: Date) => {
    return isSameMonth(date, dateToCompare || dateForCurrentMonth.value);
  };

  const formatDate = (date: Date, dateFormat = "yyyy-MM-dd") => {
    return format(date, dateFormat);
  };

  const formatToSuffixedDate = (isoDateString: string) => {
    return format(new Date(isoDateString), `MMMM do yyyy`);
  };

  return {
    years,
    months,
    startOfWeek,
    dayFormat,
    currentDate,
    currentDay,
    currentDateString,
    currentMonth,
    currentYear,
    currentFormattedDate,
    currentMonthFormatted,
    currentYearFormatted,
    dates,
    setCurrentDate,
    isInSameMonth,
    formatDate,
    formatToSuffixedDate,
  };
};
