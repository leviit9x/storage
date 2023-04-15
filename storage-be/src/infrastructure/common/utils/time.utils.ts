export class TimeUtils {
  static isTimeDiffMinutes(beforeTime: Date, m = 1) {
    const timeDiffMs = new Date().getTime() - new Date(beforeTime).getTime();
    const timeDiffMinutes = timeDiffMs / (1000 * 60);
    return timeDiffMinutes === m;
  }
}
