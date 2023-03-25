```mermaid
sequenceDiagram
    participant UI as Admin Dashboard
    participant BE as Firebase Functions
    UI ->> BE: list all admin
    BE ->> UI: return all admin
```