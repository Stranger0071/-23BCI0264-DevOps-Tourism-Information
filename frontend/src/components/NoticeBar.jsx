import { Link } from 'react-router-dom';

export default function NoticeBar() {
  return (
    <div className="notice-bar">
      Summer season advisory: Book houseboats early for June–August.{' '}
      <Link to="/guides">Check travel guides</Link> for permit updates.
    </div>
  );
}
