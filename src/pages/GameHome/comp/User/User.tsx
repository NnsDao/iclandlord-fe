import { useSizeState } from '@/hooks/sizeContext';
import defaultAvatar from '@/static/resource/defaultAvatar.png';
import user from '@/static/resource/form/user.png';
import { MouseEventHandler, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast, { Toaster } from 'react-hot-toast';
import { useGlobalContext } from '../../../../hooks/Store/Store';
import { shortPrincipal } from '../../../../lib/utils';
import Form from '../DefaultForm';
import './index.css';

export default function User({ open, close }: { open: boolean; close: MouseEventHandler<HTMLDivElement> }) {
  const { h, w, sp, getSizeStyle } = useSizeState();

  const [copyState, setCopy] = useState(false);

  const { state } = useGlobalContext();

  const principal = state.principal;

  console.log(state.isAuthed, principal, 'header page login');

  function setCopyStatus(value) {
    setCopy(value);
    toast.success('Copy Success!');
  }

  return (
    <Form bgUrl={user} open={open} title="USER CENTER" close={close}>
      <div style={{ paddingLeft: w(48) }} className="user-content">
        <div style={{ width: w(258) }} className="left">
          <img style={{ width: w(120), height: h(120) }} className="user-avatar2" src={defaultAvatar} />

          <div className="id-line">
            <span style={{ fontSize: sp(28) }} className="id-title">
              ID:{' '}
            </span>
            <span style={{ fontSize: sp(28) }} className="id-value">
              {principal && !principal.isAnonymous() && shortPrincipal(principal.toText())}
            </span>
          </div>

          <div
            style={{
              ...getSizeStyle(247, 89),
              fontSize: sp(32),
              marginTop: h(72),
              paddingTop: h(15),
              paddingLeft: w(24),
            }}
            className="copy-btn scale-touch">
            <CopyToClipboard
              text={principal && !principal.isAnonymous() && principal.toText()}
              onCopy={() => setCopyStatus(true)}>
              <span>Copy Principal</span>
            </CopyToClipboard>
          </div>
        </div>

        <div style={{ marginRight: w(87), marginLeft: w(70), fontSize: sp(32) }} className="right">
          <div style={{ marginTop: h(42) }} className="info-line line1">
            <div className="name">Nid</div>

            <div className="phone">des</div>
          </div>

          {/* 用户性别 */}
          <div style={{ marginTop: h(48) }} className="info-line line2">
            <div style={getSizeStyle(347, 53)} className="choose-box"></div>
          </div>

          <div style={{ marginTop: h(61) }} className="info-line line3">
            <div className="phone">Badge: non</div>

            <div className="phone"></div>
          </div>

          <div style={{ marginTop: h(57) }} className="info-line line4">
            <div className="phone">SIGN</div>
          </div>
        </div>
        <Toaster />
      </div>
    </Form>
  );
}
