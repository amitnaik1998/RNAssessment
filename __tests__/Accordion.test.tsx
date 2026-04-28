/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { Text, TouchableOpacity } from 'react-native';
import Accordion from '../src/components/Accordion';

describe('Accordion', () => {
  const props = { title: 'Grocery List', content: 'Milk, eggs, bread' };

  const findTextNodes = (root: any, value: string) =>
    root.findAll(
      (node: any) => node.type === Text && node.props.children === value,
    );

  test('renders the title', async () => {
    let tree: any;
    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(<Accordion {...props} />);
    });

    expect(findTextNodes(tree.root, props.title)).toHaveLength(1);
  });

  test('hides the content initially', async () => {
    let tree: any;
    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(<Accordion {...props} />);
    });

    expect(findTextNodes(tree.root, props.content)).toHaveLength(0);
  });

  test('reveals the content when pressed', async () => {
    let tree: any;
    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(<Accordion {...props} />);
    });

    await ReactTestRenderer.act(() => {
      tree.root.findByType(TouchableOpacity).props.onPress();
    });

    expect(findTextNodes(tree.root, props.content)).toHaveLength(1);
  });
});
