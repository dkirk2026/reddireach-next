import React from 'react';
import { SHADOWBAN_GUIDE_URL, REDDIT_APPEALS_URL } from '../data/shadowban';

export default function ShadowbanChecker() {
  return (
    <div className="checker sb-checker">
      <div className="checker-head">Check your profile manually</div>
      <p className="sb-body">This guide walks you through the checks yourself. It does not return an automated account status.</p>
      <dl className="sb-notes">
        <div className="sb-note">
          <dt>Exact username</dt>
          <dd>Copy your profile link from Reddit while signed in. Check the username spelling before opening it elsewhere.</dd>
        </div>
        <div className="sb-note">
          <dt>Public profile</dt>
          <dd>Open that link in a private browser window where you are logged out. A visible profile means your profile is public. A missing profile alone does not prove a shadowban; check your spelling and inbox too. A blocked request gives no account-status result.</dd>
        </div>
        <div className="sb-note">
          <dt>Recent post</dt>
          <dd>Open a recent post by its direct link while logged out. A single removed or filtered post can be a community issue even when your profile is public.</dd>
        </div>
        <div className="sb-note">
          <dt>Reddit inbox</dt>
          <dd>Sign in and check your inbox and any ban banner. A temporary sitewide ban can leave your public profile unchanged. Follow the instructions in any notice.</dd>
        </div>
        <div className="sb-note">
          <dt>Appeal if needed</dt>
          <dd>If you believe your account was flagged by mistake, log in and <a href={REDDIT_APPEALS_URL} target="_blank" rel="noopener noreferrer">file an appeal with Reddit</a>. File once; Reddit may limit repeat appeals.</dd>
        </div>
      </dl>
      <a className="sb-guide" href={SHADOWBAN_GUIDE_URL}>Read the full shadowban guide</a>
    </div>
  );
}
