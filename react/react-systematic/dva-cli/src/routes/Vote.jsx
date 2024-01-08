import React from "react";
import { Button } from "antd";

const Vote = function Vote(props) {
  return (
    <div className="vote-box">
      <div className="header">
        <h2 className="title">React</h2>
        {/* <span className="num">{supNum + oppNum}</span> */}
      </div>
      <div className="main">
        {/* <p>支持人数:{supNum}人</p>
        <p>反对人数:{oppNum}人</p> */}
      </div>
      <div className="footer">
        <Button type="primary" onClick={() => {}}>
          支持
        </Button>
        <Button type="primary" danger onClick={() => {}}>
          反对
        </Button>
      </div>
    </div>
  );
};

export default Vote;
