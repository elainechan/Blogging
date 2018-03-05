# Blogging



## AWS Lightsaile
### SSH into VM
- `chmod 400 LightsailDefaultPrivateKey-us-east-2.pem`
- `ssh -i LightsailDefaultPrivateKey-us-east-2.pem bitnami@18.221.6.81`

- `enable VPC Peering` on Accounts/Advanced page
- to make yarn work
	- `sudo chown -R $USER:$(id -gn $USER)/home/bitnami/.config`
- or use npm
	- `sudo npm run dev`