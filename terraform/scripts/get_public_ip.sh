#!/bin/bash

# INFO: $1   : Beinhaltet der erste Parameter, der dem Script übergeben wird
#       2>&1 : Sendet Errors nach /dev/null, damit das Script nicht beendet wird
echo $(aws ec2 describe-instances --filter Name=tag:App,Values=save-your-tiers --query 'Reservations[*].Instances[?!contains(State.Name, `terminated`)].{Instance:PublicIpAddress}' --output text)
