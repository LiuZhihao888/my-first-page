// 主逻辑模块
document.addEventListener('DOMContentLoaded', () => {
  // 当前页码（从1开始）
  let currentPage = 1;
  // 学习记录（记录每页首次学习的时间）
  let studyRecords = JSON.parse(localStorage.getItem('studyRecords') || '{}');

  // 初始化应用
  initApp();

  // 初始化应用
  function initApp() {
    // 1. 初始化词库（同步操作）
    wordData.loadWordList();

    // 2. 初始化计时器
    timer.reset();

    // 3. 计算总页数和总单词数
    const totalPages = wordData.getTotalPages();
    const totalWords = wordData.getTotalWords();

    // 4. 更新进度显示
    uiRender.updateProgress(currentPage, totalPages, 0, totalWords);

    // 5. 渲染第一页单词
    showPage(currentPage);

    // 6. 绑定事件
    bindEvents();

    // 7. 开始计时
    timer.start();
  }

  // 显示指定页码的单词
  function showPage(pageNum) {
    const words = wordData.getWordsByPage(pageNum);
    uiRender.renderWordList(words);

    // 更新进度显示
    const totalPages = wordData.getTotalPages();
    const totalWords = wordData.getTotalWords();
    const learnedWords = calculateLearnedWords();
    uiRender.updateProgress(pageNum, totalPages, learnedWords, totalWords);

    // 更新按钮状态
    uiRender.setBtnStatus(pageNum === 1, pageNum === totalPages);

    // 记录学习时间（如果还没有记录）
    if (!studyRecords[pageNum]) {
      studyRecords[pageNum] = Date.now();
      localStorage.setItem('studyRecords', JSON.stringify(studyRecords));
    }
  }

  // 计算已学单词数（按页计算，每页100词）
  function calculateLearnedWords() {
    const studiedPages = Object.keys(studyRecords).length;
    const totalPages = wordData.getTotalPages();
    const totalWords = wordData.getTotalWords();

    // 如果所有页都学完了，返回总单词数
    if (studiedPages === totalPages) {
      return totalWords;
    }

    // 否则按页数计算（最后一页可能不足100词）
    const fullStudiedPages = studiedPages - (currentPage === totalPages ? 1 : 0);
    let count = fullStudiedPages * 100;

    // 如果当前是最后一页且已学习，加上最后一页的实际词数
    if (currentPage === totalPages && studyRecords[currentPage]) {
      count += wordData.getWordsByPage(currentPage).length;
    }

    return count;
  }

  // 绑定事件
  function bindEvents() {
    // 上一页
    document.getElementById('prevBtn').addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
      }
    });

    // 下一页（都认识）
    document.getElementById('nextBtn').addEventListener('click', () => {
      const totalPages = wordData.getTotalPages();
      if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
      } else {
        // 通关处理
        finishStudy();
      }
    });

    // 暂停计时
    document.getElementById('pauseBtn').addEventListener('click', () => {
      timer.pause();
      document.getElementById('pauseBtn').style.display = 'none';
      document.getElementById('resumeBtn').style.display = 'inline-block';
    });

    // 继续计时
    document.getElementById('resumeBtn').addEventListener('click', () => {
      timer.resume();
      document.getElementById('pauseBtn').style.display = 'inline-block';
      document.getElementById('resumeBtn').style.display = 'none';
    });

    // 重新学习
    document.getElementById('restartBtn').addEventListener('click', () => {
      // 隐藏弹窗
      document.getElementById('successModal').style.display = 'none';
      // 重置学习记录
      studyRecords = {};
      localStorage.removeItem('studyRecords');
      // 重置到第一页
      currentPage = 1;
      // 重新初始化
      initApp();
    });
  }

  // 通关处理
  function finishStudy() {
    // 结束计时
    const totalTime = timer.end();

    // 计算统计数据
    const totalPages = wordData.getTotalPages();
    const totalWords = wordData.getTotalWords();
    const avgTime = totalPages > 0 ? totalTime / totalPages : 0;

    // 渲染通关弹窗
    uiRender.renderSuccessModal(totalTime, totalWords, totalPages, avgTime);
  }
});