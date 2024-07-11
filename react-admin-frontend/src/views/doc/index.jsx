import React from 'react';
import TypingCard from '@/components/TypingCard'
const Doc = () => {
  const cardContent = `
    作者博客请戳这里 <a href="https://nlrx-wjc.github.io/Blog/" target="_blank">York的博客</a>。
    作者博客请戳这里作者博客请戳这里作者博客请戳这里作者博客请戳这里作者博客请戳这里作者博客请戳这里作者博客请戳这
    里作者博客请戳这里作者博客请戳这里作者博客请戳这里作者博客请戳这里作者博客请戳这里作者博客请戳这里作者博客请戳
    这里作者博客请戳这里作者博客请戳这里作者博客请戳这里作者博客请戳这里作者博客请戳这里作者博客请戳这里作者博客请戳这里
  `
  return (
    <div className="app-container">
      <TypingCard title='作者博客' source={cardContent} />
      {/* {cardContent} */}
    </div>
  );
}

export default Doc;