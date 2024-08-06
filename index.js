async function main() {
    const aws = require('aws-sdk');
    const cloudwatch = new aws.CloudWatch({ apiVersion: '2010-08-01', region: 'us-east-1' });

    const image = {
        "view": "timeSeries",
        "stacked": false,
        "metrics": [
            ["AWS/ApiGateway", "5XXError", "ApiName", "attendance-api", "Stage", "prod"],
            ["AWS/ApiGateway", "Latency", "ApiName", "attendance-api", "Stage", "prod"],
            ["AWS/ApiGateway", "4XXError", "ApiName", "attendance-api", "Stage", "prod"],
            ["AWS/ApiGateway", "IntegrationLatency", "ApiName", "attendance-api", "Stage", "prod"],
            ["AWS/ApiGateway", "Count", "ApiName", "attendance-api", "Stage", "prod"]
        ],
        "width": 1201,
        "height": 200,
        "start": "-PT168H",
        "end": "P0D"
    }


    const widgetDefinition = {
        MetricWidget: JSON.stringify(image)
    };

    const response = await cloudwatch.getMetricWidgetImage(widgetDefinition).promise();

    console.log(response.MetricWidgetImage.toString('base64'));
}

main();