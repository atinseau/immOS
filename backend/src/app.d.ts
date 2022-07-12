

type OldFastifyRequest = import('fastify').FastifyRequest;

declare interface FastifyRequest<T = any> extends OldFastifyRequest {
	body: T
}
