lambda_policy_invoke = false
lambda_policy_s3     = false
lambda_memory_size   = "128"
lambda_timeout       = "60"
bucket_name          = []
sqs_queue            = []

# if you use S3 events to invoke lambda
# s3_triggers = {
#   bucket_name1 = {        #--> bucket name 
#     triggers_folder = "/" #--> bucket folder name
#   }
# }
