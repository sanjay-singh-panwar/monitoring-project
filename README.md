# Monitoring Project with Prometheus, Grafana, Loki, and Promtail

This project sets up a comprehensive monitoring and logging stack using Docker Compose. It integrates **Prometheus** for metrics collection, **Grafana** for visualization, **Loki** for log aggregation, and **Promtail** for log shipping.

## 🚀 Project Overview

This setup enables:

- **Prometheus** to collect and store metrics from various sources.
- **Grafana** to visualize metrics and logs through customizable dashboards.
- **Loki** to aggregate and store logs.
- **Promtail** to collect logs from local sources and ship them to Loki.


## ⚙️ Service Descriptions

### 1. **Prometheus**
- **Definition**: Prometheus is an open-source monitoring and alerting toolkit designed for reliability and scalability.
- **Role**: Collects and stores metrics data from configured targets.
- **Default Port**: `9090`
- **Access URL**: [http://localhost:9090](http://localhost:9090)

### 2. **Grafana**
- **Definition**: Grafana is an open-source analytics and monitoring platform.
- **Role**: Visualizes metrics and logs through customizable dashboards.
- **Default Port**: `3000`
- **Access URL**: [http://localhost:3000](http://localhost:3000)
- **Login**: `admin/admin`

### 3. **Loki**
- **Definition**: Loki is a horizontally-scalable, highly-available log aggregation system inspired by Prometheus.
- **Role**: Aggregates and stores logs.
- **Default Port**: `3100`
- **Access URL**: [http://localhost:3100](http://localhost:3100)

### 4. **Promtail**
- **Definition**: Promtail is an agent which ships the contents of local logs to a private Loki instance.
- **Role**: Collects logs from local sources and ships them to Loki.
- **Default Port**: N/A (No UI)

## 🧩 How It Works

1. **Promtail** collects logs from local sources (e.g., Docker containers, system logs) and ships them to **Loki**.
2. **Loki** stores these logs and makes them available for querying.
3. **Prometheus** scrapes metrics from various targets and stores them.
4. **Grafana** queries both Prometheus and Loki to visualize metrics and logs on dashboards.

## 🚀 Getting Started

### Prerequisites
- Docker
- Docker Compose

### Setup
1. Clone the repository:

```bash
git clone https://github.com/sanjay-singh-panwar/monitoring-project.git
cd monitoring-project
```

2. Start the services:
 ```bash
      docker-compose up -d
 ```

### Access the services:

- Prometheus: http://localhost:9090
- Grafana: http://localhost:3000
- Loki: http://localhost:3100

### Configure Grafana:

- **Log in to Grafana.**

- **Add Prometheus and Loki as data sources.**

- **Import dashboards from the grafana/dashboards/ directory.**

-------------------

