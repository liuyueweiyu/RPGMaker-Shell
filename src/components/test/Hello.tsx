import * as React from 'react';

export interface Props {
  name: string;
  enthusiasmLevel?: number;
}

// func 
// function Hello({ name, enthusiasmLevel = 1 }: Props) {
//   if (enthusiasmLevel <= 0) {
//     throw new Error('You could be a little more enthusiastic. :D');
//   }

//   return (
//     <div className="hello">
//       <div className="greeting">
//         Hello {name + enthusiasmLevel.toString()}
//       </div>
//     </div>
//   );
// }

// class
class Hello extends React.Component<Props, object> {
    render() {
      const { name, enthusiasmLevel = 1 } = this.props;
  
      if (enthusiasmLevel <= 0) {
        throw new Error('You could be a little more enthusiastic. :D');
      }
  
      return (
        <div className="hello">
          <div className="greeting">
            Hello {name + enthusiasmLevel.toString()}
          </div>
        </div>
      );
    }
  }

export default Hello;