import React from 'react';
import { Alert } from 'react-native';

interface Props {
  visible: boolean;
  homeName: string;
  role: 'member' | 'admin' | 'owner';
  onExplore: () => void;
  onClose: () => void;
}

const JoinHomeAlert: React.FC<Props> = ({ visible, homeName, role, onExplore, onClose }) => {
  if (!visible) return null;

  const roleDisplay = role === 'admin' ? 'quản trị viên' : role === 'owner' ? 'chủ sở hữu' : 'thành viên';

  Alert.alert(
    'Thành công',
    `Bạn đã trở thành ${roleDisplay} của ${homeName}. Bạn có muốn khám phá home này không?`,
    [
      {
        text: 'Khám phá',
        onPress: onExplore,
      },
      {
        text: 'Đóng',
        style: 'cancel',
        onPress: onClose,
      },
    ]
  );

  return null;
};

export default JoinHomeAlert;
