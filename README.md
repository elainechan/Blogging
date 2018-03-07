# Blogging
- When and where do `publishDate` and `id` get added

## AWS Lightsail Notes
### SSH into VM
- `chmod 400 LightsailDefaultPrivateKey-us-east-2.pem`
- `ssh -i LightsailDefaultPrivateKey-us-east-2.pem bitnami@18.221.6.81`
- `enable VPC Peering` on Accounts/Advanced page
- to run using yarn
	- `sudo chown -R $USER:$(id -gn $USER)/home/bitnami/.config`
- or just use npm
	- `sudo npm run dev`