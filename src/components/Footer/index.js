import React from 'react';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="ac-globalfooter">
      <div className="ac-globalfooter-content">
        <div className="ac-globalfooter-directory">
          <div className="ac-globalfooter-directory-column">
            <h3 className="ac-globalfooter-directory-headline">产品</h3>
            <ul className="ac-globalfooter-directory-list">
              <li><a href="#features">功能</a></li>
              <li><a href="#download">下载</a></li>
              <li><a href="#open-source">开源</a></li>
            </ul>
          </div>
          <div className="ac-globalfooter-directory-column">
            <h3 className="ac-globalfooter-directory-headline">社区</h3>
            <ul className="ac-globalfooter-directory-list">
              <li><a href="https://github.com/suhang12332/SwiftCraftLauncher" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://github.com/suhang12332/SwiftCraftLauncher/issues" target="_blank" rel="noopener noreferrer">问题反馈</a></li>
              <li><a href="https://github.com/suhang12332/SwiftCraftLauncher/releases" target="_blank" rel="noopener noreferrer">版本记录</a></li>
            </ul>
          </div>
          <div className="ac-globalfooter-directory-column">
            <h3 className="ac-globalfooter-directory-headline">法律</h3>
            <ul className="ac-globalfooter-directory-list">
              <li><a href="https://github.com/suhang12332/SwiftCraftLauncher/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">AGPL v3 许可证</a></li>
              <li><a href="https://github.com/suhang12332/SwiftCraftLauncher/blob/main/PRIVACY.md" target="_blank" rel="noopener noreferrer">隐私政策</a></li>
            </ul>
          </div>
        </div>

        <div className="ac-globalfooter-bottom">
          <p className="ac-globalfooter-copyright">
            Copyright © {year} Apple Inc. 保留所有权利。
          </p>
          <p className="ac-globalfooter-legal-links">
            <span>SwiftCraftLauncher 不隶属于 Mojang Studios 或 Microsoft。</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
