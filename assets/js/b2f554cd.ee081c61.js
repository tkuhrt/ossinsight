"use strict";(self.webpackChunkdocus=self.webpackChunkdocus||[]).push([[1477],{30010:function(e){e.exports=JSON.parse('{"blogPosts":[{"id":"/build-a-real-time-analytics-dashboard-in-metabase","metadata":{"permalink":"/blog/build-a-real-time-analytics-dashboard-in-metabase","editUrl":"https://github.com/pingcap/ossinsight/edit/main/blog/build-a-real-time-analytics-dashboard-in-metabase.md","source":"@site/blog/build-a-real-time-analytics-dashboard-in-metabase.md","title":"Build a Real-time Analytics Dashboard in Logistics Industry with Metabase","description":"#Real-time analytics","date":"2022-04-24T08:40:15.411Z","formattedDate":"April 24, 2022","tags":[{"label":"Real-time analytics","permalink":"/blog/tags/real-time-analytics"},{"label":"Proliferate data","permalink":"/blog/tags/proliferate-data"},{"label":"Logistics industry","permalink":"/blog/tags/logistics-industry"}],"readingTime":3.81,"truncated":false,"authors":[],"nextItem":{"title":"Changelog","permalink":"/blog/changelog"}},"content":"`#Real-time analytics`\\n&nbsp;\\n`#Proliferate data`\\n&nbsp;\\n`#Logistics industry`\\n\\nIn this tutorial, you will build a prototype for PingExpress_DemoCorp\u2019s real-time analytics dashboard that runs on a TiDB Cloud Proof-of-Concept (PoC) cluster.\\n\\n![](https://en.pingcap.com/wp-content/uploads/2022/03/Metabase-dashboard-overview.png)\\n\\n> Disclaimer:\\n> \\n* PingExpress_DemoCorp is a dummy company. It does NOT reflect or imply any real company.\\n* This tutorial is for demonstration purposes only. Do NOT use any material (including but not limited to code, and commands) from this tutorial in production environments.\\n\\n\\nPingExpress_DemoCorp is a supply chain management company in the United States. With more people shopping online due to the pandemic, it\u2019s business has scaled rapidly. They\u2019re delivering tens of billions of packages a year.\\n\\nWith so many deliveries, a key part of their success is accurate and efficient package tracking. Business managers need to know where packages are so they can identify potential traffic blocks and rearrange delivery routes. Customers need accurate delivery dates so they can plan ahead. Therefore, real-time tracking, status updates, and a detailed dashboard are very important to PingExpress_DemoCorp.\\n\\n**With the current technology infra, PingExpress_DemoCorp is facing growing pains:**\\n\\nPingExpress_DemoCorp uses MySQL. For a real-time dashboard, they need to use both historical data and new data coming in. Data analytics rely on stored procedures. As business roars, more data needs to be stored. The MySQL sharding solution can\u2019t meet their requirements, and the system is hard to scale and maintain.\\nDuring peak hours, the performance on a standalone machine is poor. There is also high risk of a single-point failure.\\n\\n\\n**PingExpress_DemoCorp considered two options:**\\n\\n> **Option A:** Add a dedicated column store to the existing data stack to separate the OLTP workload from the OLAP workload.\\n\\n> **Option B:** Replace MySQL database with TiDB, which contains both the row store for daily transactions and the column store for analytical workloads.\\n\\nPingExpress_DemoCorp chose **option B**. \\n\\nThis is because adding another column storage for analysis workload makes the system more complicated. At the same time, data has to be synchronized from the row store to the column store via painful ETL processes over night. This means that choosing option A still does not enable PingExpress_DemoCorp to do real-time analytics.\\n\\n**On the other hand, switching to [TiDB Cloud](https://en.pingcap.com/tidb-cloud/?utm_source=ossinsight)   as the backend database is very attractive to PingExpress_DemoCorp\uff1a**\\n\\nIn this tutorial, you will build a prototype for PingExpress_DemoCorp\u2019s real-time analytics dashboard that runs on a \\nTiDB Cloud Proof-of-Concept (PoC) cluster.\\n\\n## Before you begin\\n\\nYou should have the following software and packages installed:\\n\\n* Python (v. 3+)\\n* MySQL connector for Python\\n* SQLAlchemy\\n* sqlalchemy-tidb\\n* Metabase\\n\\n\\nNote: It is recommended to use pip3 to install packages, such as SQLAlchemy. We also suggest NOT to use the Mac application version for Metabase. It is gradually being phased out. You may use the jar version instead.\\n\\n:::info\\n** We recomand you Start with [TiDB Cloud Documentation](https://docs.pingcap.com/tidbcloud/?utm_source=ossinsight) and finish this [10-minute tutorial](https://ossinsight.io/blog/try-it-yourself/) first.**\\n:::\\n\\n## 1. Create a dashboard.\\n\\n1. In the top right corner of the dashboard, click the **+** sign, and then choose **New Dashboard**.\\n2. Enter the name as **PingExpress_dashboard**.\\n3. Click ***Create***.\\n\\n## 2. Add a question.\\n\\n1. In the top right corner, click **Ask a question** on the top right corner, and then choose **Native query**.\\n2. Select **PingExpressDB** as the database.\\n3. Display the total number of packages delivered. Enter the following query and click the right side of the screen to run it:\\n`SELECT COUNT(*) FROM packages WHERE transaction_kind=\\"4_pkg_out\\";`\\n\\n## 3. Save the question.\\n\\n1. In the upper right corner, click **Save**.\\n2. Enter the name **Total packages delivered**.\\n3. When being asked if you would like to add this question to the dashboard, click **Yes please!**, and choose **PingExpress_dashboard**.\\nThe result will now appear on the dashboard.\\n4. Click **Save**.\\n\\n## 4. Repeat steps 2 and 3 for the second question, \u201cNumber of packages on the way.\u201d This is the query to use:\\n\\n`SELECT COUNT(*) FROM packages WHERE transaction_kind != \\"4_pkg_out\\";`\\n\\n## 5. Visualize the **Number of packages in process in each state**.\\n\\n1. Repeat step 3 and use the following query instead.\\n`SELECT start_state, COUNT(package_id)`\\n2. After getting the result, click the **Visualization** button, and then choose **Map**. For the map options:\\n * Map Type: Region map\\n * Region Map: United States\\n * Leave everything else as default.\\n\\n3. Repeat step 4 and add this question to the dashboard.\\n![](https://en.pingcap.com/wp-content/uploads/2022/03/Add-questions-to-dashboard-768x602.png)\\n\\n## 6. (Optional) Repeat the previous steps to add two more queries:\\n1. Number of packages in each stage (pie chart):\\n`SELECT transaction_kind, count(*) `\\n\\n2. Number of new packages per day (line chart):\\n`SELECT DATE(start_time), count(*) `"},{"id":"/changelog","metadata":{"permalink":"/blog/changelog","editUrl":"https://github.com/pingcap/ossinsight/edit/main/blog/changelog.md","source":"@site/blog/changelog.md","title":"Changelog","description":"2022-03-22","date":"2022-04-24T08:40:15.411Z","formattedDate":"April 24, 2022","tags":[],"readingTime":0.065,"truncated":false,"authors":[],"prevItem":{"title":"Build a Real-time Analytics Dashboard in Logistics Industry with Metabase","permalink":"/blog/build-a-real-time-analytics-dashboard-in-metabase"},"nextItem":{"title":"Difference Between MySQL Compatible Databases ...","permalink":"/blog/difference-between-mysql-compatible-databases"}},"content":"## 2022-03-22\\n\\n- Add \\"Compare Projects\\" tools\\n- Add \\"Try It Yourself\\" blog"},{"id":"/difference-between-mysql-compatible-databases","metadata":{"permalink":"/blog/difference-between-mysql-compatible-databases","editUrl":"https://github.com/pingcap/ossinsight/edit/main/blog/difference-between-mysql-compatible-databases.md","source":"@site/blog/difference-between-mysql-compatible-databases.md","title":"Difference Between MySQL Compatible Databases ...","description":"Contributors","date":"2022-04-24T08:40:15.411Z","formattedDate":"April 24, 2022","tags":[],"readingTime":0.81,"truncated":false,"authors":[],"prevItem":{"title":"Changelog","permalink":"/blog/changelog"},"nextItem":{"title":"Data Preparation for Analytics","permalink":"/blog/how-it-works"}},"content":"## Contributors\\n\\n> Contributors open pull requests, issues and comment in pr body & issue body\\n\\n<iframe width=\\"100%\\" height=\\"400\\" src=\\"/charts/tidb-vs-mysql-compatible-databases-contributor.html?theme=vintage&v=3\\"></iframe>\\n\\n## Contributions\\n> Total Number of Pull Request + Issue + Comment + Review\\n\\n<iframe width=\\"100%\\" height=\\"400\\" src=\\"/charts/tidb-vs-mysql-compatible-databases-contribution.html?theme=vintage&v=3\\"></iframe>\\n\\n\\n## Code\\n> lines of modified code: additions + deletions\\n\\n<iframe width=\\"100%\\" height=\\"400\\" src=\\"/charts/tidb-vs-mysql-compatible-databases-code.html?theme=vintage&v=3\\"></iframe>\\n\\n\\n### The top 10 pull request code additions+deletions of `percona/percona-server`\\n\\n```sql\\ngharchive_dev> select (additions+deletions) as lines_modified, concat(\'https://github.com/percona/percona-server/pull/\', number) from github_ev\\n            -> ents where repo_name = \'percona/percona-server\' order by lines_modified desc limit 10;\\n+----------------+-------------------------------------------------------------------+\\n| lines_modified | concat(\'https://github.com/percona/percona-server/pull/\', number) |\\n+----------------+-------------------------------------------------------------------+\\n| 1847591        | https://github.com/percona/percona-server/pull/3474               |\\n| 1847131        | https://github.com/percona/percona-server/pull/3474               |\\n| 1611523        | https://github.com/percona/percona-server/pull/3978               |\\n| 1611239        | https://github.com/percona/percona-server/pull/3978               |\\n| 1526190        | https://github.com/percona/percona-server/pull/4204               |\\n| 1525900        | https://github.com/percona/percona-server/pull/4235               |\\n| 1525495        | https://github.com/percona/percona-server/pull/4235               |\\n| 1436855        | https://github.com/percona/percona-server/pull/4204               |\\n| 919569         | https://github.com/percona/percona-server/pull/4407               |\\n| 831538         | https://github.com/percona/percona-server/pull/3604               |\\n+----------------+-------------------------------------------------------------------+\\n10 rows in set\\nTime: 0.168s\\ngharchive_dev>\\n```\\n\\n\\n## Pull Requests\\n> Pull requests trend\\n\\n<iframe width=\\"100%\\" height=\\"400\\" src=\\"/charts/tidb-vs-mysql-compatible-databases-pull-request.html?theme=vintage&v=3\\"></iframe>"},{"id":"/how-it-works","metadata":{"permalink":"/blog/how-it-works","editUrl":"https://github.com/pingcap/ossinsight/edit/main/blog/how-it-works.md","source":"@site/blog/how-it-works.md","title":"Data Preparation for Analytics","description":"All the data we use here on this website sources from GH Archive, a non-profit project that records and archives all GitHub events data since 2011. The total data volume archived by GH Archive can be up to 4 billion rows. We download the json file on GH Archive and convert it into csv format via Script, and finally load it into the TiDB cluster in parallel through TiDB-Lightning.","date":"2022-04-24T08:40:15.411Z","formattedDate":"April 24, 2022","tags":[],"readingTime":4.315,"truncated":false,"authors":[],"prevItem":{"title":"Difference Between MySQL Compatible Databases ...","permalink":"/blog/difference-between-mysql-compatible-databases"},"nextItem":{"title":"\u25b6\ufe0f  Use TiDB Cloud to Analyze GitHub Events in 5 Minutes","permalink":"/blog/try-it-yourself"}},"content":"All the data we use here on this website sources from [GH Archive](https://www.gharchive.org/), a non-profit project that records and archives all GitHub events data since 2011. The total data volume archived by GH Archive can be up to 4 billion rows. We download the `json file` on GH Archive and convert it into csv format via Script, and finally load it into the TiDB cluster in parallel through [TiDB-Lightning](https://docs.pingcap.com/tidb/stable/tidb-lightning-overview).\\n\\nIn this post, we will explain step by step how we conduct this process. \\n\\n\\n1. Prepare the data in csv format for TiDB Lighting. \\n\\n```\\n\u251c\u2500\u2500 gharchive_dev.github_events.000000000000.csv\\n\u251c\u2500\u2500 gharchive_dev.github_events.000000000001.csv\\n\u251c\u2500\u2500 gharchive_dev.github_events.000000000002.csv\\n\u251c\u2500\u2500 gharchive_dev.github_events.000000000003.csv\\n\u251c\u2500\u2500 gharchive_dev.github_events.000000000004.csv\\n\u251c\u2500\u2500 gharchive_dev.github_events.000000000005.csv\\n\u251c\u2500\u2500 gharchive_dev.github_events.000000000006.csv\\n\u251c\u2500\u2500 gharchive_dev.github_events.000000000007.csv\\n\u251c\u2500\u2500 gharchive_dev.github_events.000000000008.csv\\n\u251c\u2500\u2500 gharchive_dev.github_events.000000000009.csv\\n\u251c\u2500\u2500 gharchive_dev.github_events.000000000010.csv\\n\u251c\u2500\u2500 gharchive_dev.github_events.000000000011.csv\\n\u251c\u2500\u2500 gharchive_dev.github_events.000000000012.csv\\n\u251c\u2500\u2500 gharchive_dev.github_events.000000000013.csv\\n```\\n\\n2. Configure the TiDB Lightning as follows.\\n\\n```\\ncat tidb-lightning.toml\\n[mydumper.csv]\\nseparator = \',\'\\ndelimiter = \'\\"\'\\nheader = true\\nnot-null = false\\nbackslash-escape = true\\ntrim-last-separator = false\\n\\n[tikv-importer]\\n backend = \\"local\\"\\n sorted-kv-dir = \\"/kvdir/\\"\\n\\ndisk-quota = \\"1.5TiB\\"\\n\\n[mydumper]\\ndata-source-dir = \\"/csv_dir/\\"\\nstrict-format = false\\nno-schema = true\\n\\n[tidb]\\nhost = \\"xxx\\"\\nport = 3306\\nuser = \\"github_events\\"\\npassword = \\"******\\"\\n\\n[lightning]\\ncheck-requirements = false\\nregion-concurrency = 32\\nmeta-schema-name = \\"gharchive_meta\\"\\n```\\n\\n3. Load the data into the TiDB cluster. \\n\\n```bash\\nnohup tidb-lightning -config ./tidb-lightning.toml > nohup.out\\n```\\n\\n4. Convert the unstructured `json file` provided by GH Archive into structured data. \\n\\n```sql\\ngharchive_dev> desc github_events;\\n+--------------------+--------------+------+-----+---------+-------+\\n| Field              | Type         | Null | Key | Default | Extra |\\n+--------------------+--------------+------+-----+---------+-------+\\n| id                 | bigint(20)   | YES  | MUL | <null>  |       |\\n| type               | varchar(255) | YES  | MUL | <null>  |       |\\n| created_at         | datetime     | YES  | MUL | <null>  |       |\\n| repo_id            | bigint(20)   | YES  | MUL | <null>  |       |\\n| repo_name          | varchar(255) | YES  | MUL | <null>  |       |\\n| actor_id           | bigint(20)   | YES  | MUL | <null>  |       |\\n| actor_login        | varchar(255) | YES  | MUL | <null>  |       |\\n| actor_location     | varchar(255) | YES  |     | <null>  |       |\\n| language           | varchar(255) | YES  | MUL | <null>  |       |\\n| additions          | bigint(20)   | YES  | MUL | <null>  |       |\\n| deletions          | bigint(20)   | YES  | MUL | <null>  |       |\\n| action             | varchar(255) | YES  | MUL | <null>  |       |\\n| number             | int(11)      | YES  |     | <null>  |       |\\n| commit_id          | varchar(255) | YES  | MUL | <null>  |       |\\n| comment_id         | bigint(20)   | YES  | MUL | <null>  |       |\\n| org_login          | varchar(255) | YES  | MUL | <null>  |       |\\n| org_id             | bigint(20)   | YES  | MUL | <null>  |       |\\n| state              | varchar(255) | YES  |     | <null>  |       |\\n| closed_at          | datetime     | YES  | MUL | <null>  |       |\\n| comments           | int(11)      | YES  | MUL | <null>  |       |\\n| pr_merged_at       | datetime     | YES  | MUL | <null>  |       |\\n| pr_merged          | tinyint(1)   | YES  |     | <null>  |       |\\n| pr_changed_files   | int(11)      | YES  | MUL | <null>  |       |\\n| pr_review_comments | int(11)      | YES  | MUL | <null>  |       |\\n| pr_or_issue_id     | bigint(20)   | YES  | MUL | <null>  |       |\\n| event_day          | date         | YES  | MUL | <null>  |       |\\n| event_month        | date         | YES  | MUL | <null>  |       |\\n| author_association | varchar(255) | YES  |     | <null>  |       |\\n| event_year         | int(11)      | YES  | MUL | <null>  |       |\\n| push_size          | int(11)      | YES  |     | <null>  |       |\\n| push_distinct_size | int(11)      | YES  |     | <null>  |       |\\n+--------------------+--------------+------+-----+---------+-------+\\n```\\n\\n5. With structured data at hand, we can start to make further analysis with TiDB Cloud. Execute SQL commands to generate analytical results. For example, you can execute SQL commands below to output the top 10 most starred JavaScript framework repos in 2021.\\n\\n```sql\\n  SELECT js.name, count(*) as stars \\n    FROM github_events \\n         JOIN js_framework_repos js ON js.id = github_events.repo_id \\n   WHERE type = \'WatchEvent\' and event_year = 2021 \\nGROUP BY 1 \\nORDER BY 2 DESC\\n   LIMIT 10;\\n+-------------------+-------+\\n| name              | stars |\\n+-------------------+-------+\\n| facebook/react    | 22830 |\\n| sveltejs/svelte   | 18573 |\\n| vuejs/vue         | 18015 |\\n| angular/angular   | 11037 |\\n| alpinejs/alpine   | 6993  |\\n| preactjs/preact   | 2965  |\\n| hotwired/stimulus | 1355  |\\n| marko-js/marko    | 1006  |\\n| neomjs/neo        | 826   |\\n| tastejs/todomvc   | 813   |\\n+-------------------+-------+\\n```\\n\\nWe have analyzed all the GitHub projects regarding databases, JavaScripe frameworks, programming languages, web frameworks, and low-code development tools, and provided valuable insights in 2021, in real time, and custom insights. If the repository you care about is not included here, you\'re welcome to submit your PR [here](https://github.com/hooopo/gharchive/tree/main/meta/repos). If you want to gain more insights into other areas, you can try TiDB Cloud by yourselves with this [10 minute tutorial](https://ossinsight.io/blog/try-it-yourself/). \\n\\nBelow are the areas of GitHub projects we have analyzed. \\n\\n```sql\\ngharchive_dev> show tables;\\n+-----------------------------+\\n| Tables_in_gharchive_dev     |\\n+-----------------------------+\\n| cn_repos                    |\\n| css_framework_repos         |\\n| db_repos                    |\\n| github_events               |\\n| js_framework_repos          |\\n| nocode_repos                |\\n| programming_language_repos  |\\n| static_site_generator_repos |\\n| web_framework_repos         |\\n+-----------------------------+\\n```"},{"id":"/try-it-yourself","metadata":{"permalink":"/blog/try-it-yourself","editUrl":"https://github.com/pingcap/ossinsight/edit/main/blog/try-it-yourself.md","source":"@site/blog/try-it-yourself.md","title":"\u25b6\ufe0f  Use TiDB Cloud to Analyze GitHub Events in 5 Minutes","description":"TiDB is an open source distributed NewSQL database with horizontal scalability, high availability, and strong consistency. It can also deal with mixed OLTP and OLAP workloads at the same time by leveraging its hybrid transactional and analytical (HTAP) capability.","date":"2022-04-24T08:40:15.411Z","formattedDate":"April 24, 2022","tags":[],"readingTime":4.66,"truncated":false,"authors":[],"prevItem":{"title":"Data Preparation for Analytics","permalink":"/blog/how-it-works"}},"content":"[TiDB](https://docs.pingcap.com/tidb/stable/overview?utm_source=ossinsight) is an open source distributed NewSQL database with horizontal scalability, high availability, and strong consistency. It can also deal with mixed OLTP and OLAP workloads at the same time by leveraging its hybrid transactional and analytical (HTAP) capability. \\n\\n**[TiDB Cloud](https://docs.pingcap.com/tidbcloud/public-preview?utm_source=ossinsight) is a fully-managed Database-as-a-Service (DBaaS)** that brings everything great about TiDB to your cloud and lets you focus on your applications, not the complexities of your database. \\n\\nIn this tutorial, we will provide you with a piece of sample data of all GitHub events occurring on January 1, 2022, and walk you through on how to use TiDB Cloud to analyze this data in 5 minutes.  \\n\\n## Sign up for a TiDB Cloud account (Free)\\n\\n1. Click [here](https://tidbcloud.com/signup?utm_source=ossinsight) to sign up for a TiDB Cloud account free of charge. \\n2. [Log in](https://tidbcloud.com/?utm_source=ossinsight) to your account.\\n\\n## Create a TiDB Developer Tier cluster (Free)\\nOnce you register an account, you can create a free cluster with TiDB Developer Tier. \\n\\n:::info\\n A cluster is a database to store data. \\n:::\\n\\n1. Click **Get Started for Free** and start to create a free cluster. \\n\\n![](/img/try-it-yourself/dev-tier.png)\\n\\n2. On the **Create a Cluster** page, set up your cluster name and root password.\\n3. Note that the cloud provider is AWS by default, and then select the `US-West-2 (Oregon)` region to create the cluster.\\n4. The cluster tier is S1.dev by default.\\n5. Click **Submit**.\\nYour TiDB Cloud cluster will be created in approximately 5 to 10 minutes.\\n\\n:::note\\nThe Developer Tier is **free** for 1 year.\\n:::\\n\\n## Import data to your TiDB Cloud cluster\\n\\n### Import the data\\nOnce your cluster is ready, you can start to import the sample data to your cluster. \\n\\n:::info\\nWe have merged the create database/table in the SQL files, so you don\'t need to `create database/tables` by yourself.\\n\\nIf you want to know the table schema, you can check `desc gharchive_dev` later in the following step. \\n:::\\n\\n1. Click the **Import** button on the **Active Clusters** page and then go to the **Data Import Task** page. \\n\\n![](/img/try-it-yourself/import.png)\\n\\n2. Copy the values below and paste to the blanks of **Bucket URL** and **Role-ARN** respectively on the **Data Import Task** page.\\n\\n**Bucket URL**:\\n```\\ns3://tidbcloud-samples/gharchive/\\n```\\n**Role-ARN**:\\n```\\narn:aws:iam::385595570414:role/import-sample-access\\n```\\n\\n3. Choose **US West (Oregon)** for your **Bucket region**;\\n4. Tick **TiDB Dumpling** for the **Data Format**. \\n5. Input your cluster password in the blank of Password on the **Target Database** section. \\n\\n![](/img/try-it-yourself/fill.png)\\n\\n6. After you fill in all the blanks on the **Data Import Task** page, click the **Import** button at the bottom of this page and wait for a few moments for the system to complete data importing. \\n\\n\\n### Use the web shell to check if data is ready\\nTiDB Cloud provides a web shell to connect the database online. \\n1. Click the **Exit** button after you successfully import the data into your cluster. \\n2. Then, click the **Connect** button and the **Connect to TiDB** panel pops out. \\n3. Choose **Web SQL Shell** --\x3e **Open SQL Shell**. \\n4. Then input your cluster password as shown in the image below.\\n\\n![](/img/try-it-yourself/web-shell.png)\\n\\n\\n### Set column storage replica: TiFlash (Optional) \\n\\n[TiFlash](https://docs.pingcap.com/tidb/stable/tiflash-overview?utm_source=ossinsight) is the key component that makes TiDB / TiDB Cloud an HTAP database and capable of dealing with OLTP and OLAP workloads at the same time. \\n\\nHere, you can try the following SQL commands on TiDB Cloud to experience its real-time analytics with ease.\\n\\n1. Execute the SQL statements specified below \\n\\n```sql\\nuse gharchive_dev;\\nALTER TABLE github_events SET TIFLASH REPLICA 1;\\n```\\n\\n2. Setting a TiFlash replica will take you some time, so you can use the following SQL statements to check if the procedure is done or not. \\n\\n```sql\\nSELECT * FROM information_schema.tiflash_replica WHERE TABLE_SCHEMA = \'gharchive_dev\' and TABLE_NAME = \'github_events\';\\n```\\n\\nIf the results you get are the same as follows, then it means the procedure is done. \\n\\n```sql\\nmysql> SELECT * FROM information_schema.tiflash_replica WHERE TABLE_SCHEMA = \'gharchive_dev\' and TABLE_NAME = \'github_events\';\\n+---------------+---------------+----------+---------------+-----------------+-----------+----------+\\n| TABLE_SCHEMA  | TABLE_NAME    | TABLE_ID | REPLICA_COUNT | LOCATION_LABELS | AVAILABLE | PROGRESS |\\n+---------------+---------------+----------+---------------+-----------------+-----------+----------+\\n| gharchive_dev | github_events |       68 |             1 |                 |         1 |        1 |\\n+---------------+---------------+----------+---------------+-----------------+-----------+----------+\\n1 row in set (0.27 sec)\\n\\nmysql>\\n```\\n\\n## Analysis!\\n\\nAfter you finish all the steps above, you can start the analytical process. \\n\\n:::tip\\nIf you want to know the table schema, you can use `show create table tbl_name` to get that information.\\n:::\\n\\nBecause you have imported the sample data of all GitHub events occurred on the first hour of 2022 (from 2022-01-01 00:00:00 to 2022-01-01 00:59:59), you can start to make any queries based on that data by using SQL commands. \\n\\n### How many events occurred in total?\\nExecute the following SQL statement to query the total number of events. \\n\\n```sql\\nSELECT count(*) FROM github_events;\\n```\\n\\n### Which repository gets the most stars?\\nExecute the following statements to query the most starred repository. \\n\\n```sql\\n  SELECT repo_name, count(*) AS events_count\\n    FROM github_events\\n   WHERE type = \'WatchEvent\' /* Yes, `WatchEvent` means star */\\nGROUP BY 1\\nORDER BY 2 DESC\\n   LIMIT 20;\\n```\\n\\n\\n## Mini Test\\nHere is a small test for you to practice how to use TiDB Cloud to conduct analytics. \\n\\n### Q: Who is the most active contributor except the robot accounts on the first hour of 2022?\\n\\n### Click for the answer. \u2b07\ufe0f\\n\\n<details><summary>Click me to show answer</summary>\\n<p>\\n\\n```sql\\n  SELECT actor_login, \\n         count(*) AS events_count\\n    FROM github_events\\n   WHERE actor_login NOT LIKE \'%bot%\'\\nGROUP BY 1\\nORDER BY 2 DESC \\n   LIMIT 20\\n```\\n\\n</p>\\n</details>\\n\\n## Watch the video below for detailed information\\n\\n<video width=\\"100%\\" poster=\\"/img/try-it-yourself/dev-tier.png\\" controls>\\n  <source src=\\"/video/github-demo-tidbcloud.mp4\\" type=\\"video/mp4\\" />\\n</video>"}]}')}}]);