curl.exe --output open-api.json --url http://localhost:3000/api-json
:: openapi-generator-cli generate -g typescript-angular -i ./open-api.json -o ./  --additional-properties npmName=slim-api,snapshot=false,ngVersion=10.0.0,npmVersion=0.0.1
@echo off
pause