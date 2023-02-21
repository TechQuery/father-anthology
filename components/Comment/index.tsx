import { FormEvent, PureComponent } from 'react';
import { Button, Col, FloatingLabel, Form } from 'react-bootstrap';
import { formToJSON } from 'web-utility';

import { CommentModel } from '../../models/Comment';
import { CommentData } from '../../service/Comment/entity';
import { CommentList } from './List';

export interface CommentBoxProps extends Pick<CommentData, 'articleId'> {
  className?: string;
}

export class CommentBox extends PureComponent<CommentBoxProps> {
  store = new CommentModel(this.props.articleId);

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { content } = formToJSON<CommentData>(event.currentTarget);

    this.store.updateOne({ content });
  };

  render() {
    const { className } = this.props;

    return (
      <footer className={className}>
        <Form className="row" onSubmit={this.handleSubmit}>
          <Col xs={12} sm={10}>
            <FloatingLabel controlId="content" label="评论">
              <Form.Control
                as="textarea"
                name="content"
                required
                placeholder="评论"
              />
            </FloatingLabel>
          </Col>
          <Button className="col-12 col-sm-2" type="submit">
            发言
          </Button>
        </Form>

        <CommentList store={this.store} />
      </footer>
    );
  }
}
