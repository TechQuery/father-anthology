import { observer } from 'mobx-react';
import { Filter } from 'mobx-restful';
import { ScrollListProps } from 'mobx-restful-table';
import { FC } from 'react';

import { CommentModel } from '../../models/Comment';
import { CommentData } from '../../service/Comment/entity';
import { XScrollList } from '../ScrollList';
import { CommentCard } from './Card';

export interface CommentListLayoutProps {
  data: CommentData[];
}

export const CommentListLayout: FC<CommentListLayoutProps> = ({ data }) => (
  <ol className="list-unstyled">
    {data.map(item => (
      <CommentCard key={item.id + ''} {...item} />
    ))}
  </ol>
);

export interface CommentListProps
  extends Omit<CommentListLayoutProps, 'data'>,
    ScrollListProps<CommentData> {
  store: CommentModel;
  filter?: Filter<CommentData>;
}

@observer
export class CommentList extends XScrollList<CommentListProps> {
  store = this.props.store;
  filter = this.props.filter || {};

  constructor(props: CommentListProps) {
    super(props);

    this.boot();
  }

  renderList() {
    const { totalCount, allItems } = this.store;

    return (
      <>
        <aside className="p-3 text-center">已有 {totalCount} 条留言</aside>

        <CommentListLayout data={allItems} />
      </>
    );
  }
}
