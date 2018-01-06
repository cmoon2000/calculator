import React, {Component} from 'react';
import './App.css';
import Monitor from './components/Monitor';
import ButtonGroup from './components/ButtonGroup';

const container = {
  "margin": "10px",
  width: "200px",
  height: "320px",
  "border": "1px solid #000000",
  "borderRadius": "5px",
  "boxShadow": "1px 1px 1px #000000"
}

const buttonName = [
  'AC',
  '+/-',
  '%',
  '/',
  '7',
  '8',
  '9',
  '*',
  '4',
  '5',
  '6',
  '-',
  '1',
  '2',
  '3',
  '+',
  '0',
  '.',
  '='
];
function calcutationCase(tmpOperator, sum, tmp) {
  var result;
  switch (tmpOperator) {
    case '+':
      result = Number(sum) + Number(tmp);
      break;
    case '-':
      result = Number(sum) - Number(tmp);
      break;
    case '*':
      result = Number(sum) * Number(tmp);
      break;
    case '/':
      result = Number(sum) / Number(tmp);
      break;
  }
  return result;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '0', // Giá trị đang hiển thị trên màn hình.
      operator: '', // Toán tử.
      tmpOperator: '', // Toán tử click cuối cùng.
      tmp: '0', // Toán hạng cuối cùng.
      sum: '', // Kết quả phép tính.
      dotCount: 0
    }
  }

  clickHandle = (clickedValue) => {
    var result;
    var {
      sum,
      display,
      tmp,
      operator,
      tmpOperator,
      dotCount
    } = this.state;
    switch (clickedValue) {

      case 'C':
        // Khi ấn nút 'C' thì giá trị trên màn hình (display) sẽ trở về '0' và giữ
        // nguyên kết quả tính toán trước (sum) và chuyển nút 'C' thành 'AC'.
        this.setState({display: '0'});
        buttonName[0] = "AC";
        break;

      case 'AC':
        // Khi ấn nút 'AC' thì khôi phục tất cả về giá trị ban đầu và chuyển nút 'AC'
        // thành 'C'.
        this.setState({
          display: '0',
          operator: '',
          tmpOperator: '',
          tmp: '0',
          sum: '',
          dotCount: 0
        });
        buttonName[0] = "AC"
        break;

      case '+':
        if (operator === '' && sum !== '') {
          // Trường hợp thay đổi toán tử  so với ban đầu (vd: đang + chuyển sang -).
          result = calcutationCase(tmpOperator, sum, tmp);
          this.setState({sum: result, display: result, tmp: result});
        } else if (operator === '') {
          // Trường hợp sau khi click số ta click button toán tử.
          this.setState({
            sum: Number(sum) + Number(tmp),
            // Kết quả mới = kết quả cũ  +  toán hạng cuối cùng nhập vào.
            display: Number(sum) + Number(tmp)
          });
        }

        // Trong mọi trường hợp operator & tmpOperator đều được set = '+' sau khi click.
        // Và set lại giá trị cho biến tạm = giá trị đang hiển thị
        this.setState({operator: '+', tmpOperator: '+', tmp: display});
        break;

      case '-':
        if (operator === '' && sum !== '') {
          result = calcutationCase(tmpOperator, sum, tmp);
          this.setState({sum: result, display: result, tmp: result});
        } else if (operator === '') {
          this.setState({
            sum: (sum === '')
              ? Number(tmp)
              : Number(sum) - Number(tmp),
            display: (sum === '')
              ? Number(tmp)
              : Number(sum) - Number(tmp)
          });
        }
        this.setState({operator: '-', tmpOperator: '-', tmp: display});
        break;

      case '*':
        if (operator === '' && sum !== '') {
          result = calcutationCase(tmpOperator, sum, tmp);
          this.setState({sum: result, display: result, tmp: result});
        } else if (operator === '') {
          this.setState({
            sum: (sum === '')
              ? Number(tmp)
              : Number(sum) * Number(tmp),
            display: (sum === '')
              ? Number(tmp)
              : Number(sum) * Number(tmp)
          });
        }
        this.setState({operator: '*', tmpOperator: '*', tmp: display});
        break;

      case '/':
        if (operator === '' && sum !== '') {
          result = calcutationCase(tmpOperator, sum, tmp);
          this.setState({sum: result, display: result, tmp: result});
        } else if (operator === '') {
          this.setState({
            sum: (sum === '')
              ? Number(tmp)
              : Number(sum) / Number(tmp),
            display: (sum === '')
              ? Number(tmp)
              : Number(sum) / Number(tmp)
          });
        }
        this.setState({operator: '/', tmpOperator: '/', tmp: display});
        break;

      case '=':
        tmpOperator = (tmpOperator === '')
          ? operator
          : tmpOperator;
        result = calcutationCase(tmpOperator, sum, tmp);
        this.setState({sum: result, display: result, operator: '='});
        break;

      case '.':
        // Nếu chưa có dấu '.' thì cộng chuỗi dấu '.' vào chuỗi hiển thị (display) trước
        // đó. Ngược lại thì bỏ qua.
        if (dotCount === 0) {
          this.setState({
            display: display + clickedValue,
            dotCount: 1
          });
        }
        break;

      case '%':
        this.setState({
          sum: Number(display) / 100,
          display: Number(display) / 100
        });
        break;
      case '+/-':
        if (Number(display) > 0) {
          this.setState({
            display: '-' + display
          });
        } else {
          this.setState({
            display: display.slice(1)
          });
        }
        break;

      default: // Trường hợp click phím số.
        // Chuyển nút 'AC' thành 'C'.
        buttonName[0] = "C";
        // Click số sau khi click '='
        if (operator === '=') {
          this.setState({
            display: clickedValue,
            operator: '0',
            tmpOperator: '',
            tmp: '0',
            sum: clickedValue,
            dotCount: 0
          });
        } else if (display === '0' || operator !== '') {
          // 1. Nếu màn hình đang hiển thị số '0' thì bỏ số '0' và hiển thị (display) giá
          // trị vừa click đồng thời gán giá trị đó cho biến tạm (temp).
          // 2. Sau khi click toán tử (+,-,*,/) thì số được click sẽ là toán hạng mới.
          this
            .setState({
              display: clickedValue,
              tmp: clickedValue,
              dotCount: 0,
              operator: ''
            }, function () {
              console.log('sum: ' + sum + '\ntmp: ' + tmp + '\ndisplay: ' + display + '\n operator: ' + operator);
            })
        } else {
          // Ngược lại ta cộng chuỗi giá trị vừa click với chuỗi trước đang hiển thị trên
          // mành hình (display) và gán ngược trở lại cho biến tạm (tmp) & biến hiển thị
          // (display)
          this.setState({
            display: display + clickedValue,
            tmp: display + clickedValue,
            operator: ''
          }, () => {
            console.log('sum: ' + sum + '\ntmp: ' + tmp + '\ndisplay: ' + display + '\n operator: ' + operator);
          });
        }

    }
  }

  render() {
    return (
      <div style={container}>
        <Monitor value={this.state.display}/>
        <ButtonGroup buttonName={buttonName} onClick={this.clickHandle}/>
      </div>
    );
  }
}

export default App;
