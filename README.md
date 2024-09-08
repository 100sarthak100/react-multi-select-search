# Multi-Select Search Component

## Introduction

The Multi-Select Search Component is a versatile React component designed to handle search functionality with multi-select capabilities. This component allows users to search through a list of items, select multiple items, and manage their selections with a highly customizable interface. It supports various states such as loading, error handling, and empty states, making it suitable for a wide range of applications.

## Installation

To install the Multi-Select Search Component, you can use npm or yarn:

```bash
npm install @sarthak100/react-multi-select-search

or

yarn add @sarthak100/react-multi-select-search
```

## Usage

Here is a basic example of how to use the Multi-Select Search Component in your React application:

```js
import React, { useState } from 'react';
import Search, { SearchSize } from '@sarthak100/react-multi-select-search';

const App: React.FC = () => {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [chips, setChips] = useState<string[]>([]);

  const fetchData = async (query: string) => {
    setLoading(true);
    try {
      // Fetch data based on query
      // Example: const response = await fetch(`/api/search?q=${query}`);
      // const result = await response.json();
      // setData(result);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Search
      data={data}
      loading={loading}
      error={error}
      onQueryChange={fetchData}
      onChipsChange={setChips}
      placeholder="Search for items..."
      size={SearchSize.Medium}
      preSelectedChips={chips}
      isPreSelectedChipsRemovable={true}
    />
  );
};

export default App;
```

## Props Description

| Prop                          | Type                                                                                                                                        | Default Value             | Description                                                      |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ---------------------------------------------------------------- |
| `placeholder`                 | `string`                                                                                                                                    | `"Search..."`             | Placeholder text for the search input field.                     |
| `ListItemComponent`           | `React.ComponentType<{ label: string; isFocused: boolean; onClick: () => void; }>`                                                          | `SearchResultItem`        | Component used to render each search result item.                |
| `ChipComponent`               | `React.ComponentType<{ label: string; size?: SearchSize; onRemove?: () => void; showRemoveIcon?: boolean; removeIcon?: React.ReactNode; }>` | `Chip`                    | Component used to render each chip.                              |
| `showError`                   | `boolean`                                                                                                                                   | `true`                    | Whether to show the error component when there is an error.      |
| `showLoading`                 | `boolean`                                                                                                                                   | `true`                    | Whether to show the loading component while fetching data.       |
| `LoadingComponent`            | `React.ComponentType`                                                                                                                       | `LoadingDefaultComponent` | Component used to render the loading state.                      |
| `ErrorComponent`              | `React.ComponentType<{ message: string }>`                                                                                                  | `ErrorDefaultComponent`   | Component used to render the error state.                        |
| `EmptyComponent`              | `React.ComponentType<{ query: string }>`                                                                                                    | `EmptyDefaultComponent`   | Component used to render the empty state.                        |
| `data`                        | `string[]`                                                                                                                                  | `[]`                      | Array of search results data.                                    |
| `loading`                     | `boolean`                                                                                                                                   | `false`                   | Indicates whether the search is in a loading state.              |
| `error`                       | `string`                                                                                                                                    | `""`                      | Error message to display when an error occurs.                   |
| `onQueryChange`               | `(query: string) => void`                                                                                                                   | -                         | Callback function that is called when the search query changes.  |
| `onChipsChange`               | `(chips: string[]) => void`                                                                                                                 | -                         | Callback function that is called when the selected chips change. |
| `size`                        | `SearchSize`                                                                                                                                | `SearchSize.Medium`       | Size variant for the component (e.g., Small, Medium, Large).     |
| `customStyles`                | `{ searchContainer?: React.CSSProperties; input?: React.CSSProperties; resultsContainer?: React.CSSProperties; }`                           | -                         | Custom styles for different parts of the component.              |
| `inputRef`                    | `React.RefObject<HTMLInputElement>`                                                                                                         | -                         | Ref object for the search input element.                         |
| `preSelectedChips`            | `string[]`                                                                                                                                  | `[]`                      | Array of pre-selected chips.                                     |
| `isPreSelectedChipsRemovable` | `boolean`                                                                                                                                   | `false`                   | Whether pre-selected chips can be removed.                       |

## License

This package is licensed under the MIT License. See the LICENSE file for more information.
