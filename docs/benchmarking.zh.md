# 测试基准

## 目录 <!-- omit in toc -->

- [Apache Benchmark](#apache-benchmark)

## Apache Benchmark

```bash
docker run --rm jordi/ab -n 100 -c 100 -T application/json -H "Authorization: Bearer USER_TOKEN" -v 2 http://<server_ip>:3000/api/v1/users
```

---

上一节: [测试](tests.md)

下一节: [自动更新依赖](automatic-update-dependencies.md)
