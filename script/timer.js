// 计时模块
const timer = (() => {
  let startTime = null; // 开始时间
  let pauseTime = 0; // 暂停累计时长
  let timerInterval = null; // 定时器
  let isPaused = false;

  // 格式化时间：毫秒 → HH:MM:SS
  const formatTime = (ms) => {
    const totalSec = Math.floor(ms / 1000);
    const h = String(Math.floor(totalSec / 3600)).padStart(2, '0');
    const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
    const s = String(totalSec % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  // 开始计时
  const start = () => {
    startTime = Date.now() - pauseTime; // 扣除暂停时间
    isPaused = false;
    timerInterval = setInterval(() => {
      if (isPaused) return;
      const currentMs = Date.now() - startTime;
      document.getElementById('currentTime').textContent = formatTime(currentMs);
    }, 1000);
  };

  // 暂停计时
  const pause = () => {
    if (!startTime) return;
    isPaused = true;
    pauseTime = Date.now() - startTime;
    clearInterval(timerInterval);
  };

  // 继续计时
  const resume = () => {
    if (!startTime || !isPaused) return;
    start();
  };

  // 结束计时，返回当前耗时（毫秒）
  const end = () => {
    clearInterval(timerInterval);
    const totalMs = Date.now() - startTime;
    // 重置状态
    startTime = null;
    pauseTime = 0;
    isPaused = false;
    return totalMs;
  };

  // 重置计时
  const reset = () => {
    clearInterval(timerInterval);
    startTime = null;
    pauseTime = 0;
    isPaused = false;
    document.getElementById('currentTime').textContent = '00:00:00';
  };

  return { start, pause, resume, end, reset, formatTime };
})();