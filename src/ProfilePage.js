import React from 'react';

import {formatDate, formatNumber, onChange} from './utils';

function TransactionListItem({i, intent, amount, balance, date}) {
  let description; let withdrawal; let deposit;
  switch (intent) {
    case 'LOAN': {
      description = 'Loan';
      deposit = amount;
      break;
    }
    case 'REPAY': {
      description = 'Repayment';
      withdrawal = amount;
      break;
    }
  }
  return <tr className={i % 2 ? 'Bgc(honeydew)' : ''}>
    <td className="Px(10px)">{formatDate(date)}</td>
    <td className="Px(10px)">{description}</td>
    <td className="Px(10px)">{withdrawal && formatNumber(withdrawal)}</td>
    <td className="Px(10px)">{deposit && formatNumber(deposit)}</td>
    <td className="Px(10px)">{formatNumber(balance)}</td>
  </tr>;
}

function LoanListItem({i, annualRate, amount, periodCount, debt, date, repaidDate, repaidAmount, repayLoan}) {
  if (repaidDate) {
    debt = 0;
  }
  return <tr className={i % 2 ? 'Bgc(honeydew)' : ''}>
    <td className="Px(10px)">{formatDate(date)}</td>
    <td className="Px(10px)">{formatNumber(annualRate * 100)}%</td>
    <td className="Px(10px)">{formatNumber(amount)}</td>
    <td className="Px(10px)">{formatNumber(periodCount)}</td>
    <td className="Px(10px)">{!repaidDate && formatNumber(debt)}</td>
    <td className="Px(10px)">{repaidDate && formatDate(repaidDate)}</td>
    <td className="Px(10px)">{repaidDate && formatNumber(repaidAmount)}</td>
    <td className="Px(10px)">
      {!repaidDate && <span className="Cur(p) C(dodgerblue):h" onClick={repayLoan}>Repay</span>}
    </td>
  </tr>;
}

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {transactions: [], loans: [], amount: ''};
  }

  async componentDidMount() {
    this.setState(await this.props.getProfile());
  }

  async repayLoan(loanId) {
    await this.props.repayLoan({loanId});
    this.setState(await this.props.getProfile());
  }

  async onSubmit(e) {
    e.preventDefault();
    await this.props.applyLoan({amount: parseInt(this.state.amount)});
    this.setState({...await this.props.getProfile(), amount: ''});
  }

  render() {
    const accountSummary = [
      {title: 'Balance', amount: this.state.cash},
      {title: 'Debt', amount: this.state.debt},
    ];

    return <div className="Mt(10px) W(1280px) Mx(a)">
      <h2 className="Fw(lr)">Bank of Gensokyo</h2>
      <p>313 Hakurei Avenue, Gensokyo</p>
      <p>800-123-2211</p>

      <h2 className="Fw(lr) Mt(10px)">Account summary</h2>
      <table>
        <tbody>
          {accountSummary.map((s, i) => <tr key={i}>
            <td className="Pend(10px)">{s.title}:</td>
            <td className="Fw(b)">${formatNumber(s.amount)}</td>
          </tr>)}
        </tbody>
      </table>

      <table className="Mt(10px)">
        <thead>
          <tr className="Bgc(mediumseagreen) C(white)">
            <td className="Px(10px)">Date</td>
            <td className="Px(10px)">Description</td>
            <td className="Px(10px)">Withdrawal</td>
            <td className="Px(10px)">Deposit</td>
            <td className="Px(10px)">Balance</td>
          </tr>
        </thead>
        <tbody>
          {this.state.transactions.map((transaction, i) => <TransactionListItem {...transaction} key={i} i={i}/>)}
        </tbody>
      </table>

      <h2 className="Fw(lr) Mt(10px)">Loans</h2>
      <form onSubmit={this.onSubmit}>
        <input type="number" required step="1000" min="0" name="amount" value={this.state.amount} onChange={this.onChange}/>
        <button>Apply for new loan</button>
      </form>
      <table className="Mt(10px)">
        <thead>
          <tr className="Bgc(mediumseagreen) C(white)">
            <td className="Px(10px)">Date</td>
            <td className="Px(10px)">APR</td>
            <td className="Px(10px)">Amount</td>
            <td className="Px(10px)">Periods</td>
            <td className="Px(10px)">Debt</td>
            <td className="Px(10px)">Repaid Date</td>
            <td className="Px(10px)">Repaid Amount</td>
            <td className="Px(10px)">Action</td>
          </tr>
        </thead>
        <tbody>
          {this.state.loans.map((loan, i) => <LoanListItem {...loan} key={i} i={i} repayLoan={() => this.repayLoan(loan.id)}/>)}
        </tbody>
      </table>
    </div>;
  }
}
