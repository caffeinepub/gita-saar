# Deployment Runbook

## Overview
This document describes the standard procedure for deploying the Gita Saar application to the Internet Computer.

## Prerequisites
- DFX CLI installed and configured
- Access to the deployment environment
- All frontend and backend code committed

## Deployment Steps

1. **Build Backend**
   ```bash
   dfx canister create backend
   dfx generate backend
   dfx build backend
   ```

2. **Build Frontend**
   ```bash
   cd frontend
   npm run prebuild  # Generates backend bindings
   npm run build:skip-bindings
   cd ..
   ```

3. **Deploy to Network**
   ```bash
   dfx deploy
   ```

4. **Verify Deployment**
   - Check canister IDs: `dfx canister id backend` and `dfx canister id frontend`
   - Access frontend URL: `https://<frontend-canister-id>.ic0.app`
   - Test basic functionality (load home page, navigate tabs)

## Logging and Reporting

For each deployment attempt, capture:
- **Step name** where failure occurred (if any)
- **Full error output** including stack traces
- **Commit hash** or source state identifier
- **Canister IDs** (backend and frontend)
- **Frontend URL** (if deployment succeeds)
- **Timestamp** of deployment attempt

Document all findings in `DEPLOY_REPORT.md`.

## Troubleshooting

### Build Failures
- Check for TypeScript errors: `npm run typescript-check`
- Verify all dependencies are installed: `npm install`
- Ensure backend bindings are generated: `dfx generate backend`

### Deployment Failures
- Check DFX wallet balance
- Verify network connectivity
- Review canister logs: `dfx canister logs backend`

### Runtime Errors
- Check browser console for frontend errors
- Review backend canister logs
- Verify API calls are reaching the backend
