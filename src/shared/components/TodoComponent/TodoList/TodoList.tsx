export default function TodoList({ items, isLoading }: { items: boolean; isLoading: boolean }) {
  // TODO: With the current tests, modify this component so it renders a dynamic list
  // * You could improve the tests by asserting on the list elements
  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {items ? (
        <ul>
          <li>BlaBla</li>
          <li>BlaBla</li>
          <li>BlaBla</li>
          <li>BlaBla</li>
        </ul>
      ) : (
        <p>no items avaible</p>
      )}
    </>
  );
}
