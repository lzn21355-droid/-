// 数据：使用 Wikimedia Commons 的可重用图片（Special:FilePath 用于稳定直链）
const foods = [
  {
    src: 'images/1.jpg',
    title: '麻婆豆腐',
    subtitle: '四川代表菜（麻辣鲜香）',
    credit: 'Sichuanfoodlover / CC BY-SA 4.0'
  },
  {
    src: 'images/2.jpg',
    title: '北京烤鸭',
    subtitle: '北京名菜（皮脆肉嫩）',
    credit: 'Wikimedia Commons / public domain or CC'
  },
  {
    src: 'images/3.jpg',
    title: '小笼包',
    subtitle: '上海点心（汤汁丰富）',
    credit: 'Wikimedia Commons / CC'
  },
  {
    src: 'images/4.jpg',
    title: '火锅',
    subtitle: '川渝/全国流行（涮烫热辣）',
    credit: 'Wikimedia Commons / CC'
  },
  {
    src: 'images/5.jpg',
    title: '兰州牛肉面',
    subtitle: '西北面食代表（牛肉拉面）',
    credit: 'Wikimedia Commons / CC'
  }
];

const grid = document.getElementById('photo-grid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');

// 创建卡片并加入页面
function createCard(food){
  const el = document.createElement('article');
  el.className = 'card';
  el.innerHTML = `
    <img src="${food.src}" alt="${food.title}" loading="lazy"
      onerror="this.alt='图片加载失败'; this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=800 height=600><rect width=800 height=600 fill=%23f4f4f4/><text x=50% y=50% dominant-baseline=middle text-anchor=middle fill=%23666 font-size=20>图片加载失败</text></svg>'">
    <div class="meta">
      <div class="title">${food.title}</div>
      <div class="subtitle">${food.subtitle}</div>
    </div>
  `;
  el.addEventListener('click', () => openLightbox(food));
  return el;
}

function openLightbox(food){
  lightboxImg.src = food.src;
  lightboxCaption.textContent = `${food.title} — ${food.subtitle} （图片：${food.credit}）`;
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(){
  lightbox.classList.remove('active');
  lightboxImg.src = '';
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox(); });

document.addEventListener('DOMContentLoaded', () => {
  foods.forEach(food => grid.appendChild(createCard(food)));

  // 按钮滚动
  const btn = document.getElementById('view-gallery');
  const section = document.getElementById('dishes');
  if (btn && section) btn.addEventListener('click', () => section.scrollIntoView({behavior:'smooth'}));

  // 表单处理（本地演示）
  const form = document.getElementById('contact-form');
  const result = document.getElementById('form-result');
  if (form && result) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const obj = Object.fromEntries(data.entries());
      result.textContent = `已收到：${obj.dish}（${obj.region}）——感谢你的推荐！`;
      form.reset();
    });
  }
});

