import { Avatar, TimeDistance } from 'idea-react';
import type { FC } from 'react';

import { CommentData } from '../../service/Comment/entity';
import { TimeOption } from '../data';

export interface CommentCardProps extends CommentData {
  className?: string;
}

export const CommentCard: FC<CommentCardProps> = ({
  className = '',
  createdAt,
  poster,
  content,
}: CommentCardProps) => (
  <li className={`d-flex gap-3 p-3 shadow-sm ${className}`}>
    <div className="text-center">
      <Avatar src={poster.avatar} />

      <h3 className="h6">{poster.nickName || poster.mobilePhone}</h3>

      <TimeDistance {...TimeOption} date={createdAt} />
    </div>
    <div className="flex-fill">{content}</div>
  </li>
);
