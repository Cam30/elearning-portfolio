# RIIMPO321F Training and Assessment

Standalone GitHub Pages application for MyneSight Pty Ltd (RTO 31900).

## Publish on GitHub Pages

1. Create a new GitHub repository.
2. Upload everything in this folder to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then save.

The application has no server dependency. Candidate progress is stored only in
the current browser using `localStorage`. Downloaded JSON evidence records must
be transferred into the RTO's controlled assessment and records system.

## Important governance

- This application supports delivery and evidence collection. It does not award
  competency or issue certification.
- A suitably credentialed assessor must authenticate and judge the evidence.
- Before each delivery, MyneSight must verify current training product details,
  legislation, codes, OEM manuals and site procedures.
- Never place personal or assessment records in a public GitHub repository.
