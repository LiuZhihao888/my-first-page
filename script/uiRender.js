// 界面渲染模块
const uiRender = (() => {
  const wordContainer = document.getElementById('wordContainer');
  const meaningCard = document.getElementById('meaningCard');

  // 渲染单词列表
  const renderWordList = (words) => {
    wordContainer.innerHTML = '';
    if (words.length === 0) {
      wordContainer.innerHTML = '<div style="text-align:center; padding:20px;">暂无单词</div>';
      return;
    }
    words.forEach(wordObj => {
      const item = document.createElement('div');
      item.className = 'word-item';
      item.textContent = wordObj.word;
      // 存储单词详情到元素属性
      item.dataset.word = wordObj.word;
      item.dataset.phonetic = wordObj.phonetic;
      item.dataset.definitions = JSON.stringify(wordObj.definitions);
      item.dataset.forms = JSON.stringify(wordObj.forms);
      item.dataset.collocations = JSON.stringify(wordObj.collocations);
      item.dataset.example = wordObj.example;
      item.dataset.examTips = wordObj.examTips;
      // 鼠标悬浮显示释义
      item.addEventListener('mouseenter', (e) => showMeaningCard(e, wordObj));
      item.addEventListener('mouseleave', hideMeaningCard);
      wordContainer.appendChild(item);
    });
  };

  // 显示释义卡片
  const showMeaningCard = (e, wordObj) => {
    meaningCard.style.display = 'block';
    
    // 构建词性与含义部分
    let definitionsHtml = '';
    if (wordObj.definitions && Array.isArray(wordObj.definitions)) {
      definitionsHtml = wordObj.definitions.map(def => {
        return `<div>${def.partOfSpeech} ${def.meanings.join('；')}</div>`;
      }).join('');
    }
    
    // 构建变形部分
    let formsHtml = '';
    if (wordObj.forms && Array.isArray(wordObj.forms) && wordObj.forms.length > 0) {
      formsHtml = `<div><strong>变形：</strong>${wordObj.forms.join('；')}</div>`;
    }
    
    // 构建搭配部分
    let collocationsHtml = '';
    if (wordObj.collocations && Array.isArray(wordObj.collocations) && wordObj.collocations.length > 0) {
      collocationsHtml = `<div><strong>搭配：</strong>${wordObj.collocations.join('；')}</div>`;
    }
    
    // 构建例句部分
    let exampleHtml = '';
    if (wordObj.example) {
      exampleHtml = `<div><strong>例句：</strong>${wordObj.example}</div>`;
    }
    
    // 构建考研要点部分
    let examTipsHtml = '';
    if (wordObj.examTips) {
      examTipsHtml = `<div><strong>考研要点：</strong>${wordObj.examTips}</div>`;
    }
    
    // 卡片内容
    meaningCard.innerHTML = `
      <div class="word">${wordObj.word}</div>
      <div class="phonetic">${wordObj.phonetic}</div>
      <div class="meaning">${definitionsHtml}</div>
      ${formsHtml}
      ${collocationsHtml}
      ${exampleHtml}
      ${examTipsHtml}
    `;
    
    // 卡片位置（鼠标右侧10px，防止超出屏幕）
    const x = e.clientX + 10;
    const y = e.clientY;
    meaningCard.style.left = `${x + meaningCard.offsetWidth > window.innerWidth ? x - meaningCard.offsetWidth - 10 : x}px`;
    meaningCard.style.top = `${y}px`;
  };

  // 隐藏释义卡片
  const hideMeaningCard = () => {
    meaningCard.style.display = 'none';
  };

  // 更新进度显示
  const updateProgress = (currentPage, totalPages, learnedWords, totalWords) => {
    document.getElementById('currentPage').textContent = currentPage;
    document.getElementById('totalPages').textContent = totalPages;
    document.getElementById('learnedWords').textContent = learnedWords;
    document.getElementById('totalWords').textContent = totalWords;
  };

  // 渲染通关弹窗
  const renderSuccessModal = (totalTime, totalWords, totalPages, avgTime) => {
    const modal = document.getElementById('successModal');
    document.getElementById('totalStudyTime').textContent = timer.formatTime(totalTime);
    document.getElementById('finalTotalWords').textContent = totalWords;
    document.getElementById('finalTotalPages').textContent = totalPages;
    document.getElementById('avgPageTime').textContent = timer.formatTime(avgTime);
    modal.style.display = 'flex';
  };

  // 禁用/启用分页按钮
  const setBtnStatus = (prevDisabled, nextDisabled) => {
    document.getElementById('prevBtn').disabled = prevDisabled;
    document.getElementById('nextBtn').disabled = nextDisabled;
  };

  return { renderWordList, updateProgress, renderSuccessModal, setBtnStatus };
})();