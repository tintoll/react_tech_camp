import * as React from 'react';
import { Button } from "antd";

interface PlayButtonProps {
  monitoring: boolean;
  onPlay?: () => void;
  onPause?: () => void;
}

export const PlayButton: React.FC<PlayButtonProps> = props => {
  // props로 받은 값을 내 컴포넌트 상태로 사용할려고 state를 사용 
  const [isPlay, togglePlay] = React.useState(props.monitoring);
  const renderIcon = isPlay ? "pause" : "caret-right";
  return(
    <div>
      <Button 
        style={{ marginTop: 20}}
        shape="circle"
        icon={renderIcon}
        onClick={ () => {
          if(isPlay) {
            props.onPause && props.onPause();
          } else {
            props.onPlay && props.onPlay();
          }

          togglePlay(!isPlay);
        }}
      />
    </div>
  );
}